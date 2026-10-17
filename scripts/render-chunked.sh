#!/usr/bin/env bash
# Render a page to MP4 in short segments, in parallel, then join them.
# Resumable: finished segments are kept, so re-running continues where it stopped.
# Usage: scripts/render-chunked.sh <page.html> <out.mp4> [segment seconds=15] [parallel=3] [crf=23]
# Keeps the result under GitHub's 100 MB file limit by re-encoding at a higher CRF if needed.
set -euo pipefail
page=$1; out=$2; seg=${3:-15}; par=${4:-3}; crf=${5:-23}
cd "$(dirname "$0")/.."
work="${TMPDIR:-/tmp}/render-chunks/$(basename "$out" .mp4)"; mkdir -p "$work"
dur=$(node -e "
const fs=require('fs'); const s=fs.readFileSync(process.argv[1],'utf8');
const m=s.match(/DURATION\s*=\s*([0-9.]+)/); console.log(m?m[1]:'');" "$page")
[ -n "$dur" ] || { echo "no DURATION in $page"; exit 1; }
n=$(node -e "console.log(Math.ceil($dur/$seg))")
seq 0 $((n-1)) | xargs -P "$par" -I{} bash -c '
  i={}; f=$(printf "%s/c%03d.mp4" "'"$work"'" $i)
  [ -s "$f" ] && exit 0
  from=$(node -e "console.log($i*'"$seg"')"); to=$(node -e "console.log(Math.min(($i+1)*'"$seg"', '"$dur"'))")
  node scripts/render.mjs "'"$page"'" "$f.part.mp4" --from $from --to $to --crf '"$crf"' >/dev/null 2>&1 && mv "$f.part.mp4" "$f" && echo "seg $i done"'
ls "$work"/c*.mp4 | sort | sed "s/^/file '/; s/$/'/" > "$work/list.txt"
[ "$(wc -l < "$work/list.txt")" -eq "$n" ] || { echo "missing segments; re-run to resume"; exit 1; }
ffmpeg -y -loglevel error -f concat -safe 0 -i "$work/list.txt" -c copy -movflags +faststart "$out"
size=$(stat -c %s "$out")
if [ "$size" -gt 95000000 ]; then
  ffmpeg -y -loglevel error -i "$out" -c:v libx264 -preset slow -crf $((crf+5)) -pix_fmt yuv420p -movflags +faststart "$out.small.mp4" && mv "$out.small.mp4" "$out"
fi
echo "wrote $out ($(du -h "$out" | cut -f1), $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")s)"
rm -rf "$work"

#!/usr/bin/env python3
"""CI-style runner for e2e_ai_test.py

Creates per-run directories under `logs/e2e_ai_runs/` containing
`stdout.log` and `stderr.log` and writes a `summary.json` with results.
"""
import subprocess
import sys
from pathlib import Path
import datetime
import json
import argparse


ROOT = Path(__file__).resolve().parent.parent
TEST_SCRIPT = ROOT / "e2e_ai_test.py"
OUTDIR = ROOT / "logs" / "e2e_ai_runs"


def run_one(idx, outdir, timeout=None):
    ts = datetime.datetime.now().strftime("%Y%m%dT%H%M%S")
    run_dir = outdir / f"run_{idx+1}_{ts}"
    run_dir.mkdir(parents=True, exist_ok=True)

    proc = subprocess.run(
        [sys.executable, str(TEST_SCRIPT)],
        cwd=str(ROOT),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
    )

    # write outputs
    (run_dir / "stdout.log").write_bytes(proc.stdout)
    (run_dir / "stderr.log").write_bytes(proc.stderr)

    return {
        "run": idx + 1,
        "timestamp": ts,
        "returncode": proc.returncode,
        "stdout": str(run_dir / "stdout.log"),
        "stderr": str(run_dir / "stderr.log"),
        "dir": str(run_dir),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--runs", type=int, default=5, help="Number of runs to perform")
    parser.add_argument("--timeout", type=int, default=120, help="Per-run timeout seconds")
    parser.add_argument("--outdir", type=str, default=str(ROOT / "logs" / "e2e_ai_runs"), help="Output root directory")
    args = parser.parse_args()

    OUTDIR = Path(args.outdir)
    OUTDIR.mkdir(parents=True, exist_ok=True)

    results = {"runs": [], "started_at": datetime.datetime.now().isoformat()}

    for i in range(args.runs):
        print(f"Running test {i+1}/{args.runs}...")
        try:
            r = run_one(i, OUTDIR, timeout=args.timeout)
        except subprocess.TimeoutExpired as e:
            # write partial info
            ts = datetime.datetime.now().strftime("%Y%m%dT%H%M%S")
            run_dir = OUTDIR / f"run_{i+1}_{ts}"
            run_dir.mkdir(parents=True, exist_ok=True)
            (run_dir / "stdout.log").write_text("")
            (run_dir / "stderr.log").write_text(f"TimeoutExpired: {e}\n")
            r = {"run": i+1, "timestamp": ts, "returncode": None, "stdout": str(run_dir / "stdout.log"), "stderr": str(run_dir / "stderr.log")}

        print(f"Run {r['run']} finished (rc={r['returncode']})")
        results["runs"].append(r)

    results["finished_at"] = datetime.datetime.now().isoformat()

    summary_path = OUTDIR / "summary.json"
    summary_path.write_text(json.dumps(results, indent=2))

    print(f"All runs complete. Summary written to: {summary_path}")


if __name__ == "__main__":
    main()

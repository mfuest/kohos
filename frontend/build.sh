#!/bin/bash
set -e

# Set environment variables to avoid Rollup native module issues
export ROLLUP_SKIP_NATIVE=true
export VITE_SKIP_NATIVE=true

# Install dependencies
npm ci

# Build the project
npm run build 
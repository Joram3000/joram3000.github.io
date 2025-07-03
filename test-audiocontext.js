// Test script to verify AudioContext is not created on page load
// This can be run in the browser console

console.log("Testing AudioContext creation...")

// Check if our global AudioContext is initially null
if (
  window.globalAudioContext === null ||
  window.globalAudioContext === undefined
) {
  console.log("✅ Global AudioContext is NOT created on page load")
} else {
  console.log("❌ Global AudioContext was created on page load")
}

// Test user interaction triggering AudioContext creation
console.log(
  "Try clicking somewhere on the page to trigger AudioContext creation...",
)

// Monitor AudioContext creation
const originalAudioContext = window.AudioContext
const originalWebkitAudioContext = window.webkitAudioContext

let audioContextCreated = false

if (originalAudioContext) {
  window.AudioContext = function (...args) {
    audioContextCreated = true
    console.log("🎵 AudioContext created!", args)
    return new originalAudioContext(...args)
  }
}

if (originalWebkitAudioContext) {
  window.webkitAudioContext = function (...args) {
    audioContextCreated = true
    console.log("🎵 webkitAudioContext created!", args)
    return new originalWebkitAudioContext(...args)
  }
}

// Check after 5 seconds
setTimeout(() => {
  if (!audioContextCreated) {
    console.log("✅ No AudioContext created after 5 seconds")
  }
}, 5000)

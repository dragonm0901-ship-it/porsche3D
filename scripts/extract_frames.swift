import AVFoundation
import AppKit
import Foundation

struct Config {
    static let inputPath = "/Users/lui/Downloads/porsche.mp4"
    static let outputDirectory = "/Users/lui/Desktop/Projects/Complete New Build/.video-stills"
    static let frameCount = 8
}

enum ExtractionError: Error {
    case invalidDuration
    case invalidImage
}

let fileManager = FileManager.default
let inputURL = URL(fileURLWithPath: Config.inputPath)
let outputURL = URL(fileURLWithPath: Config.outputDirectory, isDirectory: true)

try fileManager.createDirectory(at: outputURL, withIntermediateDirectories: true)

let asset = AVURLAsset(url: inputURL)
let durationSeconds = try await asset.load(.duration).seconds

guard durationSeconds.isFinite, durationSeconds > 0 else {
    throw ExtractionError.invalidDuration
}

let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceAfter = .zero
generator.requestedTimeToleranceBefore = .zero

let step = durationSeconds / Double(Config.frameCount + 1)

for index in 1...Config.frameCount {
    let seconds = step * Double(index)
    let time = CMTime(seconds: seconds, preferredTimescale: 600)
    let image = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: image)

    guard let data = bitmap.representation(using: .png, properties: [:]) else {
        throw ExtractionError.invalidImage
    }

    let filename = String(format: "frame-%02d-%.2fs.png", index, seconds)
    let destination = outputURL.appendingPathComponent(filename)
    try data.write(to: destination)
    print("saved \(destination.path)")
}

print("duration \(durationSeconds)")

# SVG Path Animator
Code by Jacob Runge - 2017

A small JQuery/Velocity plugin for animating SVG paths (such as signatures).

## Requirements
* [JQuery](www.jquery.com)
* [Velocity.js and the Velocity UI pack](www.velocityjs.org)

## Usage
Usage of the SVG Path Animator is very simple.
* First, you must create an SVG element within your HTML code
* Create an AniPath object: `var myAnimation = new AniPath('#SVGselector', '.pathClass'`, where '#SVGselector' is the CSS ID selector of your SVG element and '.pathClass' is the optional class selector to target which paths to animate. If 'pathClass' is not passed, the AniPath object will animate all paths in sequence. You can create multiple AniPaths per SVG element to target different path classes.
* Initialize the AniPath object using `myAnimation.init(duration, delay, minSpeed)`, where 'duration' is the (rough) duration of the entire animation, 'delay' is an optional pause before each new path is drawn, and 'minSpeed' is the optional minimum speed at which a single path can be drawn. The last option prevents shorter paths from drawing very slowly when duration is divided among paths.
* Call `myAnimation.animate()` when you are ready to animate the SVG's paths.

`myAnimation.init()` will initialize defaults of duration = 3000, delay = 0, minSpeed = 0.

## Granular control
AniPath duration, delay, and minSpeed values can be overridden with data attributes inserted into the SVG path elements. If certain data attributes are present, they will override any values passed by the init() function.

The attributes you can use on a per-path basis:
* data-delay = the amount of time to delay before beginning the path's animation
* data-speed = the duration of the path's animation

Setting attributes per-path in your SVG code is the recommended way to exercise granular control over your animation.

## Examples
[SVG Animated Signature](https://jsfiddle.net/jwrunge/z1b1ft2s/) - No class targeting, no granular control

[SVG Animated Signature](https://jsfiddle.net/jwrunge/bqrykL52/) - No class targeting, granular control

As you can see, having more granular control over animation speed and delay makes for more natural, less jerky animation; foregoing granular control offers less precision, but greater convenience.

let spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 200,
    "padding": 5,
    "data": [
        {
            "name": "table",
            "values": [
                {
                    "category": "A",
                    "amount": 28
                },
                {
                    "category": "B",
                    "amount": 55
                },
                {
                    "category": "C",
                    "amount": 43
                },
                {
                    "category": "D",
                    "amount": 91
                },
                {
                    "category": "E",
                    "amount": 81
                },
                {
                    "category": "F",
                    "amount": 53
                },
                {
                    "category": "G",
                    "amount": 19
                },
                {
                    "category": "H",
                    "amount": 87
                }
            ]
        }
    ],
    "signals": [
        {
            "name": "tooltip",
            "value": {},
            "on": [
                {
                    "events": "rect:mouseover",
                    "update": "datum"
                },
                {
                    "events": "rect:mouseout",
                    "update": "{}"
                }
            ]
        }
    ],
    "scales": [
        {
            "name": "xscale",
            "type": "band",
            "domain": {
                "data": "table",
                "field": "category"
            },
            "range": "width",
            "padding": 0.05,
            "round": true
        },
        {
            "name": "yscale",
            "domain": {
                "data": "table",
                "field": "amount"
            },
            "nice": true,
            "range": "height"
        }
    ],
    "axes": [
        {
            "orient": "bottom",
            "scale": "xscale"
        },
        {
            "orient": "left",
            "scale": "yscale"
        }
    ],
    "marks": [
        {
            "type": "rect",
            "from": {
                "data": "table"
            },
            "encode": {
                "enter": {
                    "x": {
                        "scale": "xscale",
                        "field": "category"
                    },
                    "width": {
                        "scale": "xscale",
                        "band": 1
                    },
                    "y": {
                        "scale": "yscale",
                        "field": "amount"
                    },
                    "y2": {
                        "scale": "yscale",
                        "value": 0
                    }
                },
                "update": {
                    "fill": {
                        "value": "steelblue"
                    }
                },
                "hover": {
                    "fill": {
                        "value": "red"
                    }
                }
            }
        },
        {
            "type": "text",
            "encode": {
                "enter": {
                    "align": {
                        "value": "center"
                    },
                    "baseline": {
                        "value": "bottom"
                    },
                    "fill": {
                        "value": "#333"
                    }
                },
                "update": {
                    "x": {
                        "scale": "xscale",
                        "signal": "tooltip.category",
                        "band": 0.5
                    },
                    "y": {
                        "scale": "yscale",
                        "signal": "tooltip.amount",
                        "offset": -2
                    },
                    "text": {
                        "signal": "tooltip.amount"
                    },
                    "fillOpacity": [
                        {
                            "test": "datum === tooltip",
                            "value": 0
                        },
                        {
                            "value": 1
                        }
                    ]
                }
            }
        }
    ]
};
let svg = "<svg class=\"marks\" width=\"435\" height=\"238\" viewBox=\"0 0 435 238\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g transform=\"translate(30,16)\"><g class=\"mark-group role-frame root\"><g transform=\"translate(0,0)\"><path class=\"background\" d=\"M0,0h400v200h-400Z\" style=\"fill: none;\"></path><g><g class=\"mark-group role-axis\"><g transform=\"translate(0.5,200.5)\"><path class=\"background\" d=\"M0,0h0v0h0Z\" style=\"pointer-events: none; fill: none;\"></path><g><g class=\"mark-rule role-axis-tick\" style=\"pointer-events: none;\"><line transform=\"translate(28,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(77,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(126,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(175,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(224,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(273,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(322,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(371,0)\" x2=\"0\" y2=\"5\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line></g><g class=\"mark-text role-axis-label\" style=\"pointer-events: none;\"><text text-anchor=\"middle\" transform=\"translate(28,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">A</text><text text-anchor=\"middle\" transform=\"translate(77,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">B</text><text text-anchor=\"middle\" transform=\"translate(126,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">C</text><text text-anchor=\"middle\" transform=\"translate(175,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">D</text><text text-anchor=\"middle\" transform=\"translate(224,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">E</text><text text-anchor=\"middle\" transform=\"translate(273,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">F</text><text text-anchor=\"middle\" transform=\"translate(322,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">G</text><text text-anchor=\"middle\" transform=\"translate(371,15)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">H</text></g><g class=\"mark-rule role-axis-domain\" style=\"pointer-events: none;\"><line transform=\"translate(0,0)\" x2=\"400\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line></g></g></g></g><g class=\"mark-group role-axis\"><g transform=\"translate(0.5,0.5)\"><path class=\"background\" d=\"M0,0h0v0h0Z\" style=\"pointer-events: none; fill: none;\"></path><g><g class=\"mark-rule role-axis-tick\" style=\"pointer-events: none;\"><line transform=\"translate(0,200)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,180)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,160)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,140)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,120)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,100)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,80)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,60)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,40)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,20)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line><line transform=\"translate(0,0)\" x2=\"-5\" y2=\"0\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line></g><g class=\"mark-text role-axis-label\" style=\"pointer-events: none;\"><text text-anchor=\"end\" transform=\"translate(-7,203)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">0</text><text text-anchor=\"end\" transform=\"translate(-7,183)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">10</text><text text-anchor=\"end\" transform=\"translate(-7,163)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">20</text><text text-anchor=\"end\" transform=\"translate(-7,143)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">30</text><text text-anchor=\"end\" transform=\"translate(-7,123)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">40</text><text text-anchor=\"end\" transform=\"translate(-7,103)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">50</text><text text-anchor=\"end\" transform=\"translate(-7,83)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">60</text><text text-anchor=\"end\" transform=\"translate(-7,63.00000000000001)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">70</text><text text-anchor=\"end\" transform=\"translate(-7,42.99999999999999)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">80</text><text text-anchor=\"end\" transform=\"translate(-7,22.999999999999996)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">90</text><text text-anchor=\"end\" transform=\"translate(-7,3)\" style=\"font-family: sans-serif; font-size: 10px; fill: #000; opacity: 1;\">100</text></g><g class=\"mark-rule role-axis-domain\" style=\"pointer-events: none;\"><line transform=\"translate(0,200)\" x2=\"0\" y2=\"-200\" style=\"fill: none; stroke: #888; stroke-width: 1; opacity: 1;\"></line></g></g></g></g><g class=\"mark-rect role-mark\"><path d=\"M5,144h47v56h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M54,89.99999999999999h47v110.00000000000001h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M103,114.00000000000001h47v85.99999999999999h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M152,17.999999999999993h47v182h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M201,37.999999999999986h47v162h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M250,94h47v106h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M299,162h47v38h-47Z\" style=\"fill: steelblue;\"></path><path d=\"M348,26h47v174h-47Z\" style=\"fill: steelblue;\"></path></g><g class=\"mark-text role-mark\"><text text-anchor=\"middle\" transform=\"translate(0,-2)\" style=\"font-family: sans-serif; font-size: 11px; fill: #333; fill-opacity: 1;\"></text></g></g></g></g></g></svg>";
export { spec, svg};
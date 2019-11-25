const calculateHydraCheckum = require('./util/calculate-hydra-checksum')
const writeAIPFile = require('./util/write-aip-file')
const ramp = [
  0,
  0.471,
  0.769,
  0.894,
  0.951,
  0.990,
  1,
  0.990,
  0.951,
  0.894,
  0.769,
  0.471,
  0
]

const START_TIME = 450 // 6am

// given desired solar noon LED power settings, generate a 12-hour hydra 26 program
// that simulates irradiance by time of day at the equator

const solarNoonPower = {
  uv: 100,
  violet: 117,
  royal: 136,
  blue: 114,
  green: 145,
  deep_red: 184,
  cool_white: 24
}

const overValue = {
  uv: 18,
  violet: 18,
  royal: 40,
  blue: 16,
  green: 109,
  deep_red: 84,
  cool_white: 37
}

const program = {
  ramp: {
    header: {
      version: 2
    },
    colors: {}
  }
}

// iterate over each color, set key in program.ramp.colors with values for each time of day
Object.keys(solarNoonPower).forEach((color) => {
  const colorProgram = {
    point: []
  }

  ramp.forEach((multiplier, i) => {
    let intensity
    if (solarNoonPower[color] <= 100) {
      console.log(color, 'here')
      intensity = solarNoonPower[color] * 10
    } else {
      // if > 100, use overValue to calculate (between 1000 and 2000)
      const overIntensity = solarNoonPower[color] - 100
      const overPercent = overIntensity / overValue[color]

      intensity = (1000 + (1000 * overPercent))
    }

    intensity = Math.round(intensity * multiplier)

    const time = START_TIME + (i * 60)

    colorProgram.point.push({
      intensity,
      time
    })
  })

  // set this color in the program
  program.ramp.colors[color] = colorProgram
})

console.log(JSON.stringify(program, null, 2))

// update the checksum so the file will be accepted by the light UI
program.ramp.header.checksum = calculateHydraCheckum(program);

writeAIPFile('./solar-curve.aip', program)

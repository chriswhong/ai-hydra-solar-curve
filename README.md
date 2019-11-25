# ai-hydra-solar-curve

Node.js script for creating aquaillumination hydra lighting programs that resemble the curve of irradiance by time of day.

## how to use
- Install Dependencies: `yarn`.
- Modify variables for light spectrum settings, time of day, etc in `solar-curve.js`.
- Run the script: `node solar-curve.js`.  It will overwrite `solar-curve.aip`.  Upload the file to your light!

<img width="963" alt="AI_Hydra_TwentySix" src="https://user-images.githubusercontent.com/1833820/69547330-6215db80-0f63-11ea-84e7-3b5cdcc0439b.png">

<img width="637" alt="Calculation_of_Solar_Insolation___PVEducation" src="https://user-images.githubusercontent.com/1833820/69547341-65a96280-0f63-11ea-822b-d8a1848c3ab3.png">

### Why

This was just an attempt to create a sunrise to sunset light profile based on real data.  The chart from [pveducation.org](https://www.pveducation.org/pvcdrom/properties-of-sunlight/calculation-of-solar-insolation) shows solar irradiance at the equator on January 1st over time.  A table view of the charts is also available on the site, from which you can infer a percentage of the mid-day (peak) value for each hour.  

This script generates an AIP file representing the same curve based on maximum power settings applied at mid-day.  You can also offset the start of the curve (I did this to push the light more towards the evening so I can see sunset while at home.


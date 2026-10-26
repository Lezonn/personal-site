import showroom from './showroom'
import workshop from './workshop'
import barbershop from './barbershop'
import ecommerce from './ecommerce'
import itDivision from './itDivision'
import campus from './campus'

// scene key (see src/data/journey.js) → builder(island, { glow, label }) → update(time)?
export const builders = {
  showroom,
  workshop,
  barbershop,
  ecommerce,
  itDivision,
  campus
}

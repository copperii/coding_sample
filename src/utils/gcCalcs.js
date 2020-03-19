function ellipsoid(name, a, invf) {
  /* constructor */
  this.name = name
  this.a = a
  this.invf = invf
}

function mod(x, y) {
  return x - y * Math.floor(x / y)
}

function modlon(x) {
  return mod(x + Math.PI, 2 * Math.PI) - Math.PI
}

function modcrs(x) {
  return mod(x, 2 * Math.PI)
}

function modlat(x) {
  return mod(x + Math.PI / 2, 2 * Math.PI) - Math.PI / 2
}

function MakeArray(n) {
  this.length = n
  for (var i = 1; i <= n; i++) {
    this[i] = 0
  }
  return this
}

function atan2(y, x) {
  var out
  if (x < 0) {
    out = Math.atan(y / x) + Math.PI
  }
  if (x > 0 && y >= 0) {
    out = Math.atan(y / x)
  }
  if (x > 0 && y < 0) {
    out = Math.atan(y / x) + 2 * Math.PI
  }
  if (x === 0 && y > 0) {
    out = Math.PI / 2
  }
  if (x === 0 && y < 0) {
    out = (3 * Math.PI) / 2
  }
  if (x === 0 && y === 0) {
    alert('atan2(0,0) undefined')
    out = 0
  }
  return out
}

function direct_ell(glat1, glon1, faz, s, ellipse) {
  // glat1 initial geodetic latitude in radians N positive
  // glon1 initial geodetic longitude in radians E positive
  // faz forward azimuth in radians
  // s distance in units of a (=nm)

  var EPS = 0.00000000005
  var r, tu, sf, cf, b, cu, su, sa, c2a, x, c, d, y, sy, cy, cz, e
  var glat2, glon2, baz, f

  if (Math.abs(Math.cos(glat1)) < EPS && !(Math.abs(Math.sin(faz)) < EPS)) {
    alert('Only N-S courses are meaningful, starting at a pole!')
  }

  var a = ellipse.a
  f = 1 / ellipse.invf
  r = 1 - f
  tu = r * Math.tan(glat1)
  sf = Math.sin(faz)
  cf = Math.cos(faz)
  if (cf === 0) {
    b = 0
  } else {
    b = 2 * atan2(tu, cf)
  }
  cu = 1 / Math.sqrt(1 + tu * tu)
  su = tu * cu
  sa = cu * sf
  c2a = 1 - sa * sa
  x = 1 + Math.sqrt(1 + c2a * (1 / (r * r) - 1))
  x = (x - 2) / x
  c = 1 - x
  c = ((x * x) / 4 + 1) / c
  d = (0.375 * x * x - 1) * x
  tu = s / (r * a * c)
  y = tu
  c = y + 1
  while (Math.abs(y - c) > EPS) {
    sy = Math.sin(y)
    cy = Math.cos(y)
    cz = Math.cos(b + y)
    e = 2 * cz * cz - 1
    c = y
    x = e * cy
    y = e + e - 1
    y =
      (((((sy * sy * 4 - 3) * y * cz * d) / 6 + x) * d) / 4 - cz) * sy * d + tu
  }

  b = cu * cy * cf - su * sy
  c = r * Math.sqrt(sa * sa + b * b)
  d = su * cy + cu * sy * cf
  glat2 = modlat(atan2(d, c))
  c = cu * cy - su * sy * cf
  x = atan2(sy * sf, c)
  c = (((-3 * c2a + 4) * f + 4) * c2a * f) / 16
  d = ((e * cy * c + cz) * sy * c + y) * sa
  glon2 = modlon(glon1 + x - (1 - c) * d * f) // fix date line problems
  baz = modcrs(atan2(sa, b) + Math.PI)

  const out = new MakeArray(0)
  out.lat = glat2
  out.lon = glon2
  out.crs21 = baz
  return out
}

export const degtodm = (deg, decplaces) => {
  // returns a rounded string DD MM.MMMM
  var deg1 = Math.floor(deg)
  var min = 60 * (deg - Math.floor(deg))
  var mins = format(min, decplaces)
  //alert("deg1="+deg1+" mins="+mins)
  // rounding may have rounded mins to 60.00-- sigh
  if (mins.substring(0, 1) === '6' && mins > 59.0) {
    deg1 += 1
    mins = format(0, decplaces)
  }

  return `${deg1} ${mins < 10 ? `0${mins}` : `${mins}`}`
}

function format(expr, decplaces) {
  // eslint-disable-next-line
  var str = '' + Math.round(eval(expr) * Math.pow(10, decplaces))
  while (str.length <= decplaces) {
    str = '0' + str
  }
  var decpoint = str.length - decplaces
  return str.substring(0, decpoint) + '.' + str.substring(decpoint, str.length)
}

export const computeDestination = props => {
  const { lat, lon, distance, bearing } = props
  const lat1 = (Math.PI / 180) * lat
  const lon1 = -(Math.PI / 180) * lon //calculations use negative east
  const distNm = distance / 1.852 //km to nautical miles
  const courseInRadians = (bearing * Math.PI) / 180
  const ellipse = new ellipsoid('WGS84', 6378.137 / 1.852, 298.257223563)
  // elliptic code
  const cde = direct_ell(lat1, -lon1, courseInRadians, distNm, ellipse) // ellipse uses East negative
  const lat2 = cde.lat * (180 / Math.PI)
  const lon2 = cde.lon * (180 / Math.PI)

  const endPoint = {
    lat: lat2,
    lon: lon2,
  }

  return endPoint
}

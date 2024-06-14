oklad = 54000
kviplate = oklad
night = oklad/176*56*.2
holi  = oklad/176*22
doplata = kviplate * .07
summ  = oklad + night + holi + doplata
stsm = {
    oklad,kviplate,night,holi,doplata,summ,
}
c(stsm)

oklad = 45000
kviplate = oklad/176 * 14*11
night = oklad/176*56*.2
holi  = oklad/176*8
doplata = kviplate * .07
summ  = oklad + night + holi + doplata
insp = {
    oklad,kviplate,night,holi,doplata,summ,
}
c(insp)

summ = stsm.summ + insp.summ
vichet = 8000
itogo = summ - vichet
delta = 37133.11 + 69872.59 - itogo
obsum = {
    summ, vichet, itogo, delta
}
c(obsum)
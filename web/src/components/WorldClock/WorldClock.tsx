const WorldClock = () => {
  const today = new Date().getTime()

  const Tokyo1Start = new Date('2023-10-01').getTime()
  const Tokyo1End = new Date('2023-10-04').getTime()

  const HakoneStart = new Date('2023-10-05').getTime()
  const HakoneEnd = new Date('2023-10-06').getTime()

  const KyotoStart = new Date('2023-10-07').getTime()
  const KyotoEnd = new Date('2023-10-10').getTime()

  const NagasakiStart = new Date('2023-10-11').getTime()
  const NagasakiEnd = new Date('2023-10-13').getTime()

  const OsakaStart = new Date('2023-10-14').getTime()
  const OsakaEnd = new Date('2023-10-17').getTime()

  const TakayamaStart = new Date('2023-10-18').getTime()
  const TakayamaEnd = new Date('2023-10-20').getTime()

  const Tokyo2Start = new Date('2023-10-21').getTime()
  const Tokyo2End = new Date('2023-10-26').getTime()

  const onTheWayThere =
    new Date('2023-09-30').setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
  const inTokyo1 = today > Tokyo1Start && today < Tokyo1End
  const inHakone = today > HakoneStart && today < HakoneEnd
  const inKyoto = today > KyotoStart && today < KyotoEnd
  const inNagasaki = today > NagasakiStart && today < NagasakiEnd
  const inOsaka = today > OsakaStart && today < OsakaEnd
  const inTakayama = today > TakayamaStart && today < TakayamaEnd
  const inTokyo2 = today > Tokyo2Start && today < Tokyo2End
  const onTheWayBack =
    new Date('2023-10-26').setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)

  const message = onTheWayThere
    ? 'We zijn onderweg naar Japan! ✈️ Het avontuur is begonnen'
    : inTokyo1
    ? 'We zijn in Tokyo!'
    : inHakone
    ? 'We zijn in Hakone!'
    : inKyoto
    ? 'We zijn in Kyoto!'
    : inNagasaki
    ? 'We zijn in Nagasaki!'
    : inOsaka
    ? 'We zijn in Osaka!'
    : inTakayama
    ? 'We zijn in Takayama!'
    : inTokyo2
    ? 'We zijn in Tokyo!'
    : onTheWayBack
    ? 'We zitten weer in het vliegtuig naar huis ✈️ Tot straks!'
    : ''

  return (
    <div className="flex flex-col items-center justify-center">
      <span>{message}</span>
      <iframe
        title="Japan time"
        src="https://free.timeanddate.com/clock/i91kf3v7/n248/tlde3/fcfff/tct/pct/th1/ts1/ta1"
        width="66"
        height="18"
        allowtransparency="true"
      ></iframe>
    </div>
  )
}

export default WorldClock

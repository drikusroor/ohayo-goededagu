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

  const inTokyo1 = today > Tokyo1Start && today < Tokyo1End
  const inHakone = today > HakoneStart && today < HakoneEnd
  const inKyoto = today > KyotoStart && today < KyotoEnd
  const inNagasaki = today > NagasakiStart && today < NagasakiEnd
  const inOsaka = today > OsakaStart && today < OsakaEnd
  const inTakayama = today > TakayamaStart && today < TakayamaEnd
  const inTokyo2 = today > Tokyo2Start && today < Tokyo2End

  const clockLabel = inTokyo1
    ? 'Tokyo:'
    : inHakone
    ? 'Hakone:'
    : inKyoto
    ? 'Kyoto:'
    : inNagasaki
    ? 'Nagasaki:'
    : inOsaka
    ? 'Osaka:'
    : inTakayama
    ? 'Takayama:'
    : inTokyo2
    ? 'Tokyo:'
    : 'Japan:'

  return (
    <div className="flex flex-row items-center gap-2">
      <h2>{clockLabel}</h2>
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

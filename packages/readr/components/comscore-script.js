/**
 * Component for implement comScore script.
 */
export default function ComScoreScript() {
  return (
    // use react script rather than next/Script to let the script show on the source of the html (view-source:)
    <script
      id="comScore"
      dangerouslySetInnerHTML={{
        __html: `
          <!-- Begin Comscore Tag -->
          var _comscore = _comscore || [];
          _comscore.push({
          c1: "2", c2: "35880649", cs_ucfr: "1",
          options: {
          enableFirstPartyCookie: true
          }
          });
          (function() {
          var s = document.createElement("script"), el =
          document.getElementsByTagName("script")[0];
          s.async = true;
          s.src = "https://sb.scorecardresearch.com/cs/CLIENT_ID/beacon.js";
          el.parentNode.insertBefore(s, el);
          })();
          <!--End Comscore Tag-->
          `,
      }}
    />
  )
}

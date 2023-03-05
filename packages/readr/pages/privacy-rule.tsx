import NextImage from 'next/image'
import { ReactElement } from 'react'
import styled from 'styled-components'

import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'

import { NextPageWithLayout } from './_app'

const Page = styled.div`
  background-color: #f1f1f1;
`

const Container = styled.div`
  padding: 60px 0;
  width: 60%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const PrivacyRuleImg = styled(NextImage)`
  max-width: 600px;
`

const Article = styled.article`
  margin-top: 30px;

  h2 {
    font-size: 1.25rem;
    + p {
      margin-top: 0.5em;
    }
  }

  p,
  ul,
  ol {
    font-size: 0.875rem;
    text-align: justify;
    line-height: 1.86;
    word-break: break-all;

    + * {
      margin-top: 1.5em;
    }

    + ul,
    + ol {
      margin-top: 0.5em;
    }
  }

  ul,
  ol {
    padding-left: 2em;
  }
`

const PrivacyRule: NextPageWithLayout = () => {
  return (
    <Page>
      <Container>
        <div role="heading" aria-level={1} aria-label="隱私權政策">
          <PrivacyRuleImg
            src="/icons/privacy-rule.svg"
            width={600}
            height={400}
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
            }}
            alt="隱私政策"
          />
        </div>

        <Article>
          <p>
            READr
            為精鏡傳媒股份有限公司所經營。本公司十分重視您的隱私權保護，將依個人資料保護法及本隱私權政策蒐集、處理及利用您的個人資料，並提供您對個人資料權利之行使與保護。若您不同意本隱私權政策之全部或部分者，請您停止使用本網站服務。
          </p>

          <h2>一、隱私權保護政策的適用範圍</h2>
          <p>
            隱私權保護政策內容，包括本網站（READr）如何處理在您使用網站服務時收集到的個人資料（個人資料係指得以識別您的身分的資料，包括但不限於姓名、生日、地址、電子郵件地址、電話號碼購物或購物瀏覽記錄、網站使用偏好等）。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
          </p>
          <p>
            您同意隱私權保護政策適用本網站以及與本網站合作的個人或公司（下稱：第三方），其均可在自身營運期間，依據本隱私權政策蒐集、處理、利用您的個人資料。若您不同意本隱私權政策，本網站得拒絕提供服務予您。
          </p>

          <h2>二、個人資料的蒐集、處理及利用方式</h2>
          <ul>
            <li>
              當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
            </li>
            <li>
              本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。
            </li>
            <li>
              於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的 IP
              位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。
            </li>
            <li>
              為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計資料或說明文字呈現，除供內部研究外，我們會視需要公佈統計資料及說明文字，但不涉及特定個人之資料。
            </li>
          </ul>

          <h2>三、資料之保護</h2>
          <ul>
            <li>
              本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
            </li>
            <li>
              如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
            </li>
          </ul>

          <h2>四、網站對外的相關連結</h2>
          <p>
            本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
          </p>

          <h2>五、與第三人共用個人資料之政策</h2>
          <p>
            本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
          </p>
          <p>前項但書之情形包括不限於：</p>
          <ul>
            <li>經由您書面同意。</li>
            <li>法律明文規定。</li>
            <li>為免除您生命、身體、自由或財產上之危險。</li>
            <li>
              與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
            </li>
            <li>
              當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
            </li>
            <li>有利於您的權益。</li>
            <li>
              本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。
            </li>
          </ul>

          <h2>六、Cookie 之使用</h2>
          <p>
            為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的
            Cookie，若您不願接受 Cookie
            的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕
            Cookie 的寫入，但可能會導至網站某些功能無法正常執行 。
          </p>
          <p>
            除了因合併、分割或其他原因概括承本網站以外，第三方以外的其他公司將根據其自訂的隱私權保護政策，而並非本政策使用其
            Cookie。
          </p>

          <h2>七、修改個人資料及偏好設定</h2>
          <p>
            本網站賦予您在任何時候修改個人帳號
            資料及偏好設定的權利，包括接受本網站通知您專題內容更新的決定權。
          </p>
          <p>
            本網站所蒐集個人資料之當事人，依個人資料保護法得對本網站行使以下權利：
          </p>
          <ol>
            <li>查詢或請求閱覽。</li>
            <li>請求製給複製本。</li>
            <li>請求補充或更正。</li>
            <li>請求補充或更正。</li>
            <li>請求刪除。</li>
          </ol>

          <p>
            會員如欲行使上述權利，可與本網站 (
            <a href="mailto:readr@readr.tw">readr@readr.tw</a>)進行申請。
          </p>
          <p>
            ※
            如拒絕提供加入會員所需必要之資料，將可能導致無法享受完整服務或完全無法使用該項服務。
          </p>

          <h2>八、保全</h2>
          <p>為保障您的隱私及安全，您於本網站的帳號資料會用密碼保護。</p>
          <p>
            在部分情況下本網站使用通行標準的 SSL 保全系統，保障資料傳送的安全
          </p>

          <h2>九、隱私權保護政策之修正</h2>
          <p>
            本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
          </p>
        </Article>
      </Container>
    </Page>
  )
}

PrivacyRule.getLayout = function getLayout(page: ReactElement) {
  const pageTitle = '隱私政策'

  return <LayoutWithLogoOnly title={pageTitle}>{page}</LayoutWithLogoOnly>
}

export default PrivacyRule

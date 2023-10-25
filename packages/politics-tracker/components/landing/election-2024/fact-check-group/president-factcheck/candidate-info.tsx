import CustomImage from '@readr-media/react-image'
import styled from 'styled-components'

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  transform: translateY(-40px);

  h3 {
    color: #0f2d35;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 4px;
  }

  .amount {
    color: rgba(15, 45, 53, 0.5);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
`

const HeadShot = styled.div`
  margin: 0px auto 12px;
  width: 128px;
  height: 120px;
`

type CandidateInfoProps = {
  amount: number
  name: string
  politicNumber: number
}
export default function CandidateInfo({
  amount,
  name,
  politicNumber,
}: CandidateInfoProps): JSX.Element {
  let imageUrl: string = '/images/default-head-phot.png'

  switch (name) {
    case '賴清德':
      imageUrl = '/images/lai-ching-te.png'
      break

    case '郭台銘':
      imageUrl = '/images/guo-tai-ming.png'
      break

    case '侯友宜':
      imageUrl = '/images/hou-yu-ih.png'
      break

    case '柯文哲':
      imageUrl = '/images/ko-wen-je.png'
      break
  }

  const amountInfo =
    amount > 0 ? `第 ${politicNumber}/${amount} 條政見` : '0 條政見'

  return (
    <Info>
      <HeadShot>
        <CustomImage
          images={{ original: imageUrl }}
          priority={true}
          alt={name}
          objectFit="contain"
        />
      </HeadShot>

      <h3 className="name">{name}</h3>
      <span className="amount">{amountInfo}</span>
    </Info>
  )
}

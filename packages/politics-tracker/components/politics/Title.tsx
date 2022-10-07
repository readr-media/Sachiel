import { useCallback, useState } from 'react'
import useFitText from 'use-fit-text'
import classNames from 'classnames'
import { getLineBreaks, getTailwindConfig } from '../../utils/utils'
import Icon from '../Icon'
import s from '../../styles/politics/Title.module.css'
const fullConfig = getTailwindConfig()

const mainTextClass = s['title-main-text']
const subTextClass = s['title-sub-text']

type BlockProps = {
  title: string
  content: string | number
  fontSize: number
  lineHeight: number
  customClass: string
  children: React.ReactNode
}
type SingleLineBlock = Pick<BlockProps, 'content' | 'customClass'>
type MultipleLineBlock = Pick<
  BlockProps,
  'content' | 'fontSize' | 'lineHeight' | 'children' | 'customClass'
>
type PoliticsBlockProps = Pick<BlockProps, 'title' | 'customClass' | 'children'>

const SingleLineBlock = (props: SingleLineBlock) => {
  const style = classNames(
    'overflow-hidden',
    'text-ellipsis',
    props.customClass
  )
  return <div className={style}>{props.content}</div>
}

const MultipleLineBlock = (props: MultipleLineBlock) => {
  const baseFontSize = props.fontSize
  const lineHeight = props.lineHeight
  const lineHeightPadding = 0.2
  const maxLineNo = 2
  const minHeight = baseFontSize * (lineHeight + lineHeightPadding)

  const [height, setHeight] = useState<number>(minHeight)

  // after use-fit-text finished calculation,
  // we should check result and decide whether to update height of the container to make it recalculate.
  const onFinish = useCallback((fontSize: number) => {
    const element = ref.current

    if (fontSize === 100) {
      // full size: check line amount of text content, if amount is 1, set the container to one-line height
      const lineNo = getLineBreaks(element.childNodes[0]).length

      if (lineNo === 1) setHeight(() => minHeight)
    } else {
      // not full size: when size is not full, it means there are two lines, so set the container to two-line height
      setHeight(
        () =>
          ((baseFontSize * fontSize) / 100) *
          (lineHeight + lineHeightPadding) *
          maxLineNo
      )
    }
  }, [])
  const { fontSize, ref } = useFitText({
    onFinish,
  })

  const style = {
    large: classNames('hidden', 'lg:block'),
    small: classNames('block', 'lg:hidden'),
  }

  return (
    <div className={props.customClass}>
      <div className={style.large}>
        <div
          ref={ref}
          style={{
            fontSize,
            height,
          }}
        >
          {props.content}
        </div>
      </div>
      <div className={style.small}>{props.children}</div>
    </div>
  )
}
const PoliticsBlock = (props: PoliticsBlockProps) => {
  const style = {
    container: classNames(
      'flex',
      'flex-col',
      'px-4',
      'py-2',
      'md:justify-around',
      'md:px-5',
      'md:py-3',
      props.customClass
    ),
    textGroup: classNames('text-left', 'md:text-center'),
    title: classNames(
      'md:mb-2',
      'md:inline-block',
      'md:w-[54px]',
      'md:text-title-sub-md',
      subTextClass
    ),
    content: classNames(
      'overflow-hidden',
      'text-ellipsis',
      'md:text-title-main-md',
      mainTextClass
    ),
  }

  return (
    <div className={style.container}>
      <div className={style.textGroup}>
        <div className={style.title}>{props.title}</div>
        <div className={style.content}>{props.children}</div>
      </div>
    </div>
  )
}

type TitleProps = {
  name: string
  avatar: string
  party: string
  partyIcon: string
  campaign: string
  completed: number
  waiting: number
}
type IconConfig = {
  width: number
  height: number
  borderWidth: number
}
type TextConfig = {
  fontSize: number
  lineHeight: number
  customClass: string
}

export default function Title(props: TitleProps): JSX.Element {
  const personLarge: IconConfig = {
    width: 80,
    height: 80,
    borderWidth: 2,
  }
  const personSmall: IconConfig = {
    width: 60,
    height: 60,
    borderWidth: 2,
  }
  const party: IconConfig = {
    width: 20,
    height: 20,
    borderWidth: 1,
  }

  const fontSizeGroup = fullConfig?.theme?.fontSize
  // @ts-ignore: next line
  const [mainFS, mainLH] = fontSizeGroup['title-main-md']
  // @ts-ignore: next line
  const [subFS, subLH] = fontSizeGroup['title-sub-md']

  const mainText: TextConfig = {
    fontSize: parseInt(mainFS),
    lineHeight: Number(mainLH),
    customClass: mainTextClass,
  }
  const subText: TextConfig = {
    fontSize: parseInt(subFS),
    lineHeight: Number(subLH),
    customClass: subTextClass,
  }

  function partyName(party: string | undefined): string {
    return !party ? '無黨籍' : party
  }

  const style: { [k: string]: any } = {
    mainContainer: classNames(
      'mt-header',
      'flex',
      'flex-row',
      'flex-wrap',
      'text-white',
      'md:mt-header-md',
      'lg:h-40',
      'lg:max-h-40',
      'lg:flex-nowrap'
    ),
    profileBlock: classNames(
      'relative',
      'flex',
      'min-h-[100px]',
      'w-full',
      'items-center',
      'bg-title-person',
      'px-4',
      'py-5',
      'shadow-title-bottom',
      'md:min-h-[120px]',
      'md:pl-10',
      'md:pr-20',
      'lg:h-full',
      'lg:w-1/2',
      'lg:py-0',
      'lg:shadow-title-bottom-and-right'
    ),
    avatarLarge: classNames('hidden', 'md:inline'),
    avatarSmall: classNames('inline', 'md:hidden'),
    name: classNames('flex', 'grow', 'flex-col', 'pl-3'),
    party: classNames('mt-2', 'flex', 'items-center', 'pr-[60px]', 'md:pr-0'),
    partyName: classNames('flex', 'grow', 'flex-col', 'pl-3'),
    tab: classNames(
      'font-[20px]',
      'absolute',
      'right-0',
      'bottom-0',
      'inline-block',
      'bg-[#F6BA31]',
      'px-3',
      'py-2',
      'font-bold',
      'leading-sub',
      'text-[#0F2D35]',
      'shadow-title-both-y-and-left',
      'md:hidden',
      'lg:font-[24px]',
      'lg:top-0',
      'lg:bottom-auto',
      'lg:inline-block',
      'lg:pt-1',
      'lg:shadow-title-bottom-and-both-x'
    ),
    dataBlock: classNames(
      'flex',
      'w-full',
      'flex-row',
      'flex-wrap',
      'lg:w-1/2'
    ),
    campaignBlock: classNames(
      'min-h-[70px]',
      'w-full',
      'bg-title-campaign',
      'shadow-title-bottom',
      'md:min-h-[124px]',
      'md:w-1/2',
      'md:shadow-title-bottom-and-right'
    ),
    statisticBlock: classNames('h-[70px]', 'w-1/2', 'md:h-auto', 'md:w-1/4'),
  }

  style['alreadyBlock'] = classNames(
    style.statisticBlock,
    'bg-title-completed',
    'shadow-title-bottom-and-right'
  )
  style['waitingBlock'] = classNames(
    style.statisticBlock,
    'bg-title-waiting',
    'shadow-title-bottom'
  )

  return (
    <div className={style.mainContainer}>
      <div className={style.profileBlock}>
        <span className={style.avatarLarge}>
          <Icon src={props.avatar} {...personLarge} />
        </span>
        <span className={style.avatarSmall}>
          <Icon src={props.avatar} {...personSmall} />
        </span>
        <div className={style.name}>
          <MultipleLineBlock content={props.name} {...mainText}>
            <SingleLineBlock content={props.name} customClass={mainTextClass} />
          </MultipleLineBlock>
          <div className={style.party}>
            <Icon src={props.partyIcon} {...party} />
            <div className={style.partyName}>
              <MultipleLineBlock content={partyName(props.party)} {...subText}>
                <SingleLineBlock
                  content={partyName(props.party)}
                  customClass={subTextClass}
                />
              </MultipleLineBlock>
            </div>
          </div>
        </div>

        <span className={style.tab}>政見</span>
      </div>
      <div className={style.dataBlock}>
        <PoliticsBlock title="參選" customClass={style.campaignBlock}>
          <MultipleLineBlock content={props.campaign} {...mainText}>
            <SingleLineBlock
              content={props.campaign}
              customClass={mainTextClass}
            />
          </MultipleLineBlock>
        </PoliticsBlock>
        <PoliticsBlock title="已審核政見" customClass={style.alreadyBlock}>
          <SingleLineBlock
            content={props.completed}
            customClass={mainTextClass}
          />
        </PoliticsBlock>
        <PoliticsBlock title="待審核政見" customClass={style.waitingBlock}>
          <SingleLineBlock
            content={props.waiting}
            customClass={mainTextClass}
          />
        </PoliticsBlock>
      </div>
    </div>
  )
}

// 處理答案中的格式轉換
const processAnswerText = (text: string) => {
  let processedText = text
    // 處理粗體文字 **text** -> <strong>text</strong> (先處理，避免和列表衝突)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 處理列表項目 - 內容 -> <li>內容</li>
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // 處理引用連結 [[1]](url) -> <a>連結</a>
    .replace(
      /\[\[(\d+)\]\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="caption-1 inline-flex size-5 flex-wrap items-center justify-center rounded-full bg-primary-200 text-primary-700 mr-2 last-of-type:mr-0">$1</a>'
    )
    // 處理換行符號 \n -> <br>
    .replace(/\n/g, '<br>')

  // 將連續的 <li> 項目包在 <ul> 中
  processedText = processedText.replace(
    /(<li>.*?<\/li>)(<br>)*(<li>.*?<\/li>)*/g,
    (match) => {
      // 移除 <br> 標籤，因為list不需要
      const cleanMatch = match.replace(/<br>/g, '')
      return `<ul class="list-disc list-inside space-y-1 my-2">${cleanMatch}</ul>`
    }
  )

  return processedText
}
export default processAnswerText

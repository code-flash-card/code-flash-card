function FrontOfCard({ content } : { content : string; }) {
  return (
    <div>
      <div>Question</div>
      <div>
        <h3>{content}</h3>
        <p>카드를 누르면 답을 확인할 수 있어요</p>
      </div>
    </div>
  )
}

function BackOfCard({ content }: { content: string; }) {
  return (
    <div>
      <div>
        <p>Answer</p>
      </div>
      <div>
        <h3>{content}</h3>
        <p>카드를 누르면 문제를 확인할 수 있어요</p>
      </div>
    </div>
  )
}

export { FrontOfCard, BackOfCard };

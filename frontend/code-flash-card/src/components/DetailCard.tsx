export default function DetailCard({ title, content, onClick } : {title: string, content: string, onClick: () => void }) {
  return (
    <div onClick={onClick}>
      <div>
        <p>{title}</p>
      </div>
      <div>
        <h3>{content}</h3>
        <p>카드를 누르면 {title} 확인할 수 있어요</p>
      </div>
    </div>
  )
}

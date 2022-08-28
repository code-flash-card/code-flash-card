import { Card } from "./FlashCards";

export default function FlashCard({ card }: { card: Card }) {
  const { explain, viewCount } = card;
  return (
    <li>
      <p>{explain}</p>
      <span>{viewCount}</span>
    </li>
  );
}

import styled from "@emotion/styled";

export default function FlashCardsTitle({ title }: { title: string }) {
    return (
        <div>
            <H1>{title}</H1>
        </div>
    );
}

const H1 = styled.h1`
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    /* identical to box height */

    color: #fefefe;
`;

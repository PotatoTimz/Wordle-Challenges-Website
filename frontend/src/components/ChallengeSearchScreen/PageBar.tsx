import { useEffect, useState } from "react";

interface Props {
  totalChallenges: number;
  pageNumber: number;
  pageLimit: number;
  nextPage: () => void;
  previousPage: () => void;
}

function PageBar(props: Props) {
  const totalPages = Math.ceil(props.totalChallenges / props.pageLimit);
  const pageBarLimit = 5;
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);

  const generatePageNumbers = () => {
    let numbers: Array<number> = [];
    if (
      props.pageNumber === 1 ||
      props.pageNumber === 2 ||
      props.pageNumber === 3
    ) {
      for (let i = 1; i < Math.min(totalPages + 1, 6); i++) {
        numbers.push(i);
      }
    } else if (
      props.pageNumber === totalPages ||
      props.pageNumber === totalPages - 1 ||
      props.pageNumber === totalPages - 2
    ) {
      for (let i = totalPages - 4; i < totalPages + 1; i++) {
        numbers.push(i);
      }
    } else {
      for (let i = props.pageNumber; i < totalPages + 1; i++) {
        numbers.push(i);
      }
    }
    setPageNumbers(numbers);
  };

  useEffect(() => {
    console.log(props.pageNumber);
    generatePageNumbers();
  }, [props.pageNumber, props.totalChallenges]);

  return (
    <div className={"justify-content-center row"}>
      {pageNumbers.map((number: number) => {
        return (
          <div
            key={number}
            className={`col ${number === props.pageNumber ? "bg-info" : ""}`}
          >
            {number}
          </div>
        );
      })}
      <button
        onClick={() => {
          if (props.pageNumber != totalPages) {
            props.nextPage();
          }
        }}
      >
        next
      </button>
      <button onClick={props.previousPage}>prev</button>
    </div>
  );
}

export default PageBar;

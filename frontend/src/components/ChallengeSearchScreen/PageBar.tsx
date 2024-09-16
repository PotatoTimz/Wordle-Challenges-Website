import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

interface Props {
  totalChallenges: number;
  pageNumber: number;
  pageLimit: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

function PageBar(props: Props) {
  const totalPages = Math.ceil(props.totalChallenges / props.pageLimit);
  const pageBarLimit = 7;
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);

  const generatePageNumbers = () => {
    let numbers: Array<number> = [];
    if (props.pageNumber <= Math.ceil(pageBarLimit / 2)) {
      for (let i = 1; i <= Math.min(totalPages, pageBarLimit); i++) {
        numbers.push(i);
      }
    } else if (props.pageNumber >= totalPages - Math.floor(pageBarLimit / 2)) {
      for (let i = totalPages - pageBarLimit + 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      for (
        let i = props.pageNumber - Math.floor(pageBarLimit / 2);
        i <= props.pageNumber + Math.floor(pageBarLimit / 2);
        i++
      ) {
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
    <Col className={"justify-content-center row my-5"} lg={7} sm={10} xs={12}>
      <button className="col border text-center" onClick={props.previousPage}>
        <i className="bi bi-arrow-left fs-6"></i>
      </button>
      {pageNumbers.map((number: number) => {
        return (
          <button
            key={number}
            onClick={() => {
              props.goToPage(number);
            }}
            data-toggle="button"
            className={`col text-center border ${
              number === props.pageNumber ? "fw-bolder" : ""
            }`}
          >
            {number}
          </button>
        );
      })}
      <button
        className="col border text-center"
        onClick={() => {
          if (props.pageNumber != totalPages) {
            props.nextPage();
          }
        }}
      >
        <i className="bi bi-arrow-right fs-6"></i>
      </button>
    </Col>
  );
}

export default PageBar;

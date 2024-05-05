import { useEffect, useState } from "react";
import { constants, problemStatusColor } from "../utils/constants";
import httpClient from "../utils/http";
import {
  LadderData,
  Problem,
  ProblemStatus,
  ProblemStatusMap,
  UserStats,
} from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils"; // remove
import TableRow from "./TableRow";

interface LadderProps {
  ladderData: LadderData;
  problemStatusMap: ProblemStatusMap;
  setUserStats: (stats: UserStats) => void;
  tagStatus: boolean;
  loaderStatus: boolean;
  setloaderStatus: (data: boolean) => void;
  filters: Array<string>;
  filterType: boolean;
}

function Ladder(props: LadderProps) {
  const data = props.ladderData;
  const [problems, setProblems] = useState<Problem[]>([]);
  const fetchProblems = async () => {
    const res = await httpClient.request({
      method: "GET",
      url: `${constants.api}/ladder`,
      params: {
        startRating: data.startRating,
        endRating: data.endRating,
      },
    });
    // console.log("res: ", res.data);
    const res2 = await fetchNewProblems();
    res2.problems = res2.problems.filter(
      (problem: any) =>
        problem.rating >= data.startRating && problem.rating < data.endRating
    );
    // every other problem is from ladder api and every other is from codeforces.com/api/problemset.problems
    let arr = [];
    let ptr = 0;
    let ptr2 = 0;
    let mp: any = {};
    for (let i = 0; i < res.data.length / 2; i++) {
      arr.push(res.data[ptr++]);
      mp[res.data[ptr - 1].name] = true;
      while (mp[res2.problems[ptr2].name]) {
        ptr2++;
        if (ptr2 >= res2.problems.length) {
          break;
        }
      }
      if (ptr2 < res2.problems.length) {
        arr.push(res2.problems[ptr2]);
        mp[res2.problems[ptr2].name] = true;
        ptr2++;
      } else {
        arr.push(res.data[ptr]);
        mp[res.data[ptr].name] = true;
        ptr++;
      }
    }

    return arr;
  };

  const fetchNewProblems = async () => {
    const tags = "constructive algorithms";
    const res = await httpClient.request({
      method: "GET",
      url: `https://codeforces.com/api/problemset.problems?tags=${tags}`,
      params: {
        startRating: data.startRating,
        endRating: data.endRating,
      },
    });
    // console.log("res: ", res);
    return res.result;
  };

  const updateProblemsWithStatus = (problems: Problem[]) => {
    let solvedCount = 0;
    const newProblems = problems.map((problem: Problem) => {
      const newStatus =
        props.problemStatusMap[getProblemID(problem)] || ProblemStatus.NONE;
      if (newStatus === ProblemStatus.AC) {
        solvedCount++;
      }
      return {
        ...problem,
        status: newStatus,
      };
    });
    props.setUserStats({
      solved: solvedCount,
      unsolved: problems.length - solvedCount,
    });
    setProblems(newProblems);
  };

  useEffect(() => {
    props.setloaderStatus(true);
    fetchProblems().then((res) => {
      res = res.map((element: any) => {
        return { ...element, status: ProblemStatus.NONE };
      });

      // filtering start
      if (props.filters.length > 0 && !props.filterType) {
        res = res.filter((problem: any) =>
          problem.tags.some((tag: string) => props.filters.includes(tag))
        );
      } else if (props.filters.length > 0 && props.filterType) {
        res = res.filter((problem: any) =>
          props.filters.every((tag: string) => problem.tags.includes(tag))
        );
      }

      // filtering end

      updateProblemsWithStatus(res);
      props.setloaderStatus(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.ladderData,
    props.filters,
    props.filterType,
    props.problemStatusMap,
  ]);

  return (
    <div className="w-full problem-table text-center">
      <table className="entire-table w-full text-gray-100 text-center border-separate border-spacing-y-2.5">
        <thead className="table-head text-sm md:text-lg">
          <tr>
            <th>Index</th>
            <th>Problem</th>
            {props.tagStatus && <th>Tags</th>}
            {!props.tagStatus && <th>Score</th>}
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-body text-sm md:text-lg">
          {problems.map((problem, idx) => {
            const status = problem.status;
            return (
              <TableRow
                key={idx}
                data={problem}
                status={status}
                index={idx}
                tagStatus={props.tagStatus}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Ladder;

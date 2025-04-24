import {Card} from "compositions";
import {PieChart, PieChartProps} from "react-minimal-pie-chart";
import type {Data, BaseDataEntry} from "react-minimal-pie-chart/dist/commonTypes";
import {useNavigate} from "react-router-dom";

export type Question = {
  question: string,
  data: BaseDataEntry[],
}

export type QData = {
  id: number,
  body: string,
  yes_count: number,
  abstain_count: number,
  no_count: number,
  created_at: Date,
}

export type ResultCardProps = {
  key: number,
  size?: number,
  data: QData,
}

export function ResultCard(
  {
    size = 110,
    data
  }: ResultCardProps) {
  const labelStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fill: '#fff',
    opacity: 0.75,
    pointerEvents: 'none',
  };

  const newData: Data = [
    { title: "Yes", value: data.yes_count, color: "#14AE5C" },
    { title: "No", value: data.no_count, color: "#D21143" },
    { title: "Abstain", value: data.abstain_count, color: "#757575" }
  ]

  const hideDate: Data = [
    { title: "Abstain", value: 1, color: "#757575"}
  ]

  const navigate = useNavigate();

  const isShown = !(data.yes_count === 0 && data.no_count === 0 && data.abstain_count === 0)

  return (
    <Card direction={"vertical"}
          className={"w-[318px] p-[10px] cursor-pointer transition-colors duration-200 hover:bg-gray-200"}
          onClick={() => {
            navigate("/vote", {
              state: {questionID: data.id}
            })
          }}
    >
      <div className={"flex gap-7 p-2"}>
        <div className={"w-[170px] my-auto flex-wrap max-w-[170px]"}>
          <div
            className="text-smuRed text-lg font-semibold font-['Inter']
              leading-[20px] text-center text-balance
              break-words align-middle">
            {data.body}
          </div>
        </div>

        <div className={"h-[80px] block grow-0"}>
          {
            isShown ?
              <PieChart
                data={newData}
                segmentsShift={4}
                animate={true}
                viewBoxSize={[size, size]}
                center={[size / 2, size / 2]}
                label={({ dataEntry }) => dataEntry.value === 0 ? "" : dataEntry.value}
                // @ts-ignore
                labelStyle={{...labelStyle}}
                labelPosition={60}
              />
              :
              <PieChart
                data={hideDate}
                animate={true}
                viewBoxSize={[size, size]}
                center={[size / 2, size / 2]}
              />
          }
        </div>

      </div>
    </Card>
  );
}

export type ResultPieProps = {
  size?: number,
  data: QData,
  isShown: boolean,
}

export function ResultPie(
  {
    size = 110,
    data,
    isShown
  }: ResultPieProps) {
  const labelStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fill: '#fff',
    opacity: 1,
    pointerEvents: 'none',
  };

  const fullLabelStyle = {
    pointerEvents: 'none',
  };

  const newData: Data = [
    { title: "Yes", value: data.yes_count, color: "#14AE5C" },
    { title: "No", value: data.no_count, color: "#D21143" },
    { title: "Abstain", value: data.abstain_count, color: "#757575" }
  ]

  const hideDate: Data = [
    { title: "Abstain", value: 1, color: "#757575"}
  ]

  return (
      <div className={"flex gap-7 mx-auto"}>
        <div className={"h-full mx-auto w-full"}>
          {
            isShown ?
              <PieChart
                data={newData}
                segmentsShift={4}
                animate={true}
                viewBoxSize={[size, size]}
                center={[size / 2, size / 2]}
                label={({ dataEntry }) => dataEntry.value === 0 ? "" : dataEntry.value}
                // @ts-ignore
                labelStyle={{...labelStyle}}
                labelPosition={60}
              />
              :
              <PieChart
                data={hideDate}
                animate={true}
                viewBoxSize={[size, size]}
                center={[size / 2, size / 2]}
              />
          }
        </div>

      </div>
  );
}
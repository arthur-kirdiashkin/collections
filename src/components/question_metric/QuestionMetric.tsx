import "./question_metric.css";

interface QuestionMetricProps {
  label: string;
  value: number;
}

export default function QuestionMetric({ label, value }: QuestionMetricProps) {
  return (
    <div className="question-metric">
      <p>{label}:</p>
      <div className="question-chip">{value}</div>
    </div>
  );
}

import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

export function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <LoadSpinner active={true}></LoadSpinner>
    </div>
  );
}
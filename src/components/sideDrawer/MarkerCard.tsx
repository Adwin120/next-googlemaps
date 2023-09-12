import MarkerData from "@/types/MarkerData";

interface Props {
    marker: MarkerData
}
//TODO: make a card
const MarkerCard: React.FC<Props> = ({marker}) => {
    return <div>{marker.name}</div>;
};

export default MarkerCard;
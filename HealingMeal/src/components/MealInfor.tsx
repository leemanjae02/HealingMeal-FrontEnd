const MealComponent = ({
  food,
  openModal,
}: {
  food: { foodName: string; imageURL: string };
  openModal: (food: { foodName: string; imageURL: string }) => void;
}) => {
  return (
    <div className="Meal_components" onClick={() => openModal(food)}>
      <div className="Meal_components_img">
        <img src={food.imageURL} />
      </div>
      <p className="Meal_components_text">{food.foodName}</p>
    </div>
  );
};

export default MealComponent;

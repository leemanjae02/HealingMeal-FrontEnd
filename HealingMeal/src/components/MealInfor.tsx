const MealComponent = ({
  food,
  openModal,
}: {
  food: { mainDish: string; imageURL: string; meals: string };
  openModal: (food: {
    mainDish: string;
    imageURL: string;
    meals: string;
  }) => void;
}) => {
  return (
    <div className="Meal_components" onClick={() => openModal(food)}>
      <div className="Meal_components_img">
        <img src={food.imageURL} />
      </div>
      <p className="Meal_components_text">{food.mainDish}</p>
    </div>
  );
};

export default MealComponent;

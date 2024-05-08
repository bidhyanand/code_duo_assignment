const SpellDetailCardDesign = ({ detailData }: { detailData: Root }) => {
  function getStars(level: number) {
    if (level === 0) {
      return "No Rating Available ";
    }
    let stars = "";

    for (let i = 0; i < level; i++) {
      stars += "⭐";
    }

    return stars;
  }

  return (
    <>
      <div className="flex justify-center    h-screen">
        <div className="border-2 border-black h-max w-[80rem] flex flex-col shadow-xl shadow-black  ">
          <h1 className="text-4xl text-center mt-4 ">{detailData?.name}</h1>

          <div className="flex  justify-between p-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Description</h1>
              <p className="text-xl">
                Casting Time:{" "}
                <span className="whitespace-nowrap">
                  {detailData?.casting_time}
                </span>
              </p>
              <p className="text-xl">Range: {detailData?.range}</p>
              <p className="text-xl">
                Components:{" "}
                {detailData?.components?.map((item: string, index: number) => (
                  <span key={index}>
                    {item}
                    {index !== detailData.components.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="text-xl">Duration: {detailData?.duration}</p>
              <p className="text-xl">
                Classes:
                {detailData?.classes?.map((items: Class, index: number) => {
                  return (
                    <span className="whitespace-nowrap ">
                      {items.name}
                      {index !== detailData.classes.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>

              <p className="text-xl">
                Level: {getStars(detailData?.level)}{" "}
                <span> {detailData?.level} </span>{" "}
              </p>
              <p className="text-xl">School: {detailData?.school?.name}</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Higher Level</h1>
              <p className="text-xl">
                {detailData?.higher_level &&
                detailData.higher_level.length > 0 ? (
                  detailData.higher_level.map((item: string, index: number) => (
                    <span key={index}>
                      {item}
                      {index !== detailData.higher_level.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span> Higher Level Description Not available</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <h1 className="text-3xl font-bold">Description</h1>
            <p className="text-xl">
              {detailData?.desc?.map((item: string, index: number) => (
                <span key={index}>
                  {item}
                  {index !== detailData.desc.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SpellDetailCardDesign;

export interface Root {
  higher_level: any[];
  index: string;
  name: string;
  desc: string[];
  range: string;
  components: string[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  area_of_effect: AreaOfEffect;
  school: School;
  classes: Class[];
  subclasses: Subclass[];
  url: string;
  damage?: string;
  attack_type?: string;
}

export interface AreaOfEffect {
  type: string;
  size: number;
}

export interface School {
  index: string;
  name: string;
  url: string;
}

export interface Class {
  index: string;
  name: string;
  url: string;
}

export interface Subclass {
  index: string;
  name: string;
  url: string;
}

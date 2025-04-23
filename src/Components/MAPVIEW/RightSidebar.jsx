


import React, { useState } from "react";

const RightSidebar = ({
  RightsidebarOpen,
  setRightSidebarOpen,
  locations,
  selectedLocation,
}) => {
  const initialWidth = 256;
  const [width, setWidth] = useState(initialWidth);

  const handleCloseSidebar = () => {
    setRightSidebarOpen(false);
  };

  const increaseWidth = () => setWidth(width + 20);

  const decreaseWidth = () => {
    if (width > initialWidth) {
      setWidth(width - 20);
    }
  };

  return (
    // <div
    //   className={`fixed top-0 right-0 mt-16 h-full z-[999] transform transition-transform duration-300 ease-in-out shadow-lg ${
    //     RightsidebarOpen ? "translate-x-0" : "translate-x-full"
    //   }`}
    //   style={{ width: `${width}px`, backgroundColor: "#d9e4ec" }}
    // >
    //   <div className="flex justify-between items-center p-4 border-b border-[#b7cfdc]">
    //     <div className="font-bold text-lg text-[#385e72]">⚙️ Right Sidebar</div>
    //   </div>

    //   <div className="p-4 text-[#385e72]">Yash</div>
    //   <button
    //     onClick={handleCloseSidebar}
    //     className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition"
    //   >
    //     &rarr;
    //   </button>
    //   <ul>
    //     {locations.map((location) => (
    //       <li key={location.id}>{location.location_name}</li>
    //     ))}
    //   </ul>
    //   <div
    //     onClick={increaseWidth}
    //     className="absolute top-1/2 right-4 bg-[#6aabd2] hover:bg-[#385e72] text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
    //     style={{ zIndex: 1000 }}
    //     title="Increase width"
    //   >
    //     +
    //   </div>

    //   <div
    //     onClick={decreaseWidth}
    //     className="absolute top-1/2 right-4 mt-10 bg-[#d9534f] hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
    //     style={{ zIndex: 1000 }}
    //     title="Decrease width"
    //   >
    //     -
    //   </div>
    // </div>

    <div
      className={`fixed top-0 right-0 mt-16 h-full z-[999] transform transition-transform duration-300 ease-in-out  overflow-y-auto max-h-[full] shadow-lg ${
        RightsidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: `${width}px`, backgroundColor: "#d9e4ec" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#b7cfdc]">
        <div className="font-bold text-lg text-[#385e72]">⚙️ Right Sidebar</div>
      </div>

      <div className="p-4 text-[#385e72]">Yash</div>
      <button
        onClick={handleCloseSidebar}
        className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition"
      >
        &rarr;
      </button>
      <p>Location ID: {selectedLocation}</p>
      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut veritatis ad repellat? Repellendus, praesentium quasi incidunt itaque et eius nesciunt eveniet esse quod, facilis mollitia dolores recusandae laborum? Ipsa eius quos saepe! Eaque, vitae quae! Amet eveniet, inventore ratione voluptatum possimus aspernatur necessitatibus, modi illum dolorem veritatis nesciunt blanditiis aperiam eos, ex praesentium exercitationem? Ad pariatur quasi expedita veritatis autem reiciendis cupiditate in quaerat ratione laudantium, voluptates accusamus deserunt qui saepe accusantium ducimus ipsa asperiores explicabo eius quae. Quasi, rem aspernatur enim voluptatibus velit quis officia praesentium ratione rerum officiis, qui expedita architecto ipsa veritatis perferendis repudiandae laborum ab tempora vitae aut pariatur dignissimos quaerat impedit! Ipsa at distinctio autem, amet, voluptate voluptatibus modi rerum perferendis qui deserunt laboriosam, fuga cumque. Reprehenderit sed minus dignissimos ad officia nobis, ipsam itaque quisquam explicabo suscipit quasi esse accusantium veritatis dicta laudantium dolorem fugiat facilis nulla dolore vitae, quod cumque deleniti voluptates corrupti? Amet adipisci quas hic dicta minus nostrum dolores praesentium eius nam provident, explicabo illum. Distinctio, iusto commodi voluptatum doloremque veritatis fuga debitis accusantium sequi impedit dolorem natus rem officia nostrum officiis vitae est autem error blanditiis. Exercitationem neque, ut eos a id, vero quidem quo eius, cumque cum consectetur! Animi at magni corporis a dolores sequi soluta, iusto corrupti ratione sunt exercitationem amet saepe mollitia fugiat nobis. Officiis suscipit dolor dicta molestias velit quam atque aut laboriosam, commodi ipsum nostrum neque magnam animi dolorum hic quo mollitia rem laborum possimus sapiente aperiam impedit exercitationem voluptas? Odio, molestias reprehenderit. Expedita ullam facilis voluptas natus consectetur doloremque harum maiores commodi ea sequi in facere quibusdam eaque repellendus quidem, ab sapiente. Expedita et reiciendis sapiente nihil rerum quasi maiores nobis eveniet esse molestiae quibusdam, facilis vitae natus ut ipsa repellendus architecto ipsum dolorum soluta pariatur nam necessitatibus debitis! Laudantium voluptatibus pariatur maiores?
      </p> */}
      <ul className="p-7 pb-12">
       
        {locations.map((location) => (
          <li key={location.id}>{location.location_name}</li>
        ))}
      </ul>

      <div
        onClick={increaseWidth}
        className="absolute top-1/2 right-4 bg-[#6aabd2] hover:bg-[#385e72] text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
        style={{ zIndex: 1000 }}
        title="Increase width"
      >
        +
      </div>

      <div
        onClick={decreaseWidth}
        className="absolute top-1/2 right-4 mt-10 bg-[#d9534f] hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
        style={{ zIndex: 1000 }}
        title="Decrease width"
      >
        -
      </div>
    </div>
  );
};

export default RightSidebar;

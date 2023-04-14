import { Header } from "@/components/header";
import { LibraryCard } from "@/components/library";
import { Dropdown } from "@packages/ui";

const Library = () => {
  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1 mt-28">도서관</p>
        <p className="text-title4 mb-20">레주메북 목록을 담은 도서관입니다.</p>
        <div className="mb-10">
          <Dropdown className="w-40" lists={["년도"]} />
        </div>
        <LibraryCard />
      </div>
    </>
  );
};

export default Library;

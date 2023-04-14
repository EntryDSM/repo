import { Header } from "@/components/header";
import { LibraryCard } from "@/components/library";

const Library = () => {
  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1">도서관</p>
        <p className="text-title4">레주메북 목록을 담은 도서관입니다.</p>
        <LibraryCard />
      </div>
    </>
  );
};

export default Library;

import { Header } from "@/components/header";
import { Button, Input } from "@packages/ui";
import { useState } from "react";
import { Plus, Search } from "@packages/ui/assets";
import { Tag } from "@/components/technology/Tag";
import {
  MajorCreate,
  createMajor,
  searchMajor,
  deleteMajor,
} from "@/apis/major";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const technology = () => {
  const [searchTechnology, setSearchTechnology] = useState("");
  const [technology, setTechnology] = useState("");

  const { data } = useQuery(["dq"], searchMajor);

  const { mutate } = useMutation({
    mutationFn: (body: string) => createMajor(body),
    onSuccess: (res) => {
      toast("성공적으로 생성하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
    },
    onError: (err) => {
      toast("무언가 잘못되었습니다!", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  const { mutate: del } = useMutation({
    mutationFn: (body: string) => deleteMajor(body),
    onSuccess: (res) => {
      toast("성공적으로 삭제하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
    },
    onError: (err) => {
      toast("무언가 잘못되었습니다!", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  const deleteTag = (uuid: string) => {
    del(uuid);
  };

  return (
    <div>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1 mt-28">전공관리</p>
        <p className="text-title4 mb-20">전공을 추가, 삭제 해보세요</p>

        <div className="flex mb-14 justify-between">
          <Input
            value={searchTechnology}
            kind="custom"
            className="bg-50 w-[436px]"
            activeIcon={<Search size={24} />}
            placeholder="검색할 전공을 입력해주세요"
            onChange={(e) => setSearchTechnology(e.target.value)}
          />
          <div className="flex">
            <Input
              value={technology}
              kind="custom"
              className="bg-50 w-[436px] mr-5"
              placeholder="추가할 전공을 입력해주세요"
              onChange={(e) => setTechnology(e.target.value)}
            />
            <Button kind="outline" onClick={() => mutate(technology)}>
              <Plus size={18} />
              전공 추가
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-body5">전체</span>
          <span className="text-gray300">16</span>
        </div>
        <div className="flex gap-3 mt-5 flex-wrap">
          {data &&
            data?.data.major_list.map((major) => (
              <Tag onClick={deleteTag} data={major} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default technology;

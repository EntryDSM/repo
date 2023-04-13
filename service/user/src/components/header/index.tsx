import { WhiteLogo } from "@packages/ui";

export const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <WhiteLogo />
          <ul>
            <li>
              <a>마이페이지</a>
            </li>
            <li>
              <a>이력서</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

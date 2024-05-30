import { GithubLineIcon, TelegramIcon, TwitterLineIcon } from '@/components/shared/icons';

const VaultSharePost = () => {
  return (
    <div className="flex items-center gap-4">
      <p>Share post</p>

      <ul className="flex items-center gap-8">
        <li>
          <span className="block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
            <TwitterLineIcon />
          </span>
        </li>
        <li>
          <span className="block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
            <TelegramIcon />
          </span>
        </li>
        <li>
          <span className="block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
            <GithubLineIcon />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default VaultSharePost;

import Link from 'next/link'
import {type githubTypes} from '@opensdks/sdk-github'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'

type Commit = githubTypes['components']['schemas']['commit']
interface CommitsListProps {
  commits: Commit[]
}

const CommitsList: React.FC<CommitsListProps> = ({commits}) => (
  <div className="space-y-4 max-w-full">
    {commits.map((commit, index) => (
      <div key={index}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="User Avatar"
                src={commit.author?.avatar_url || '/placeholder-user.jpg'}
              />
              <AvatarFallback>{commit.author?.login.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg">{commit.commit.author?.name}</h2>
              <Badge variant="outline">{commit.sha.slice(0, 7)}</Badge>
            </div>
          </div>
          <Link className="underline text-right" href={commit.html_url}>
            View Commit
          </Link>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {commit.commit.message}
        </p>
      </div>
    ))}
  </div>
)

export default CommitsList

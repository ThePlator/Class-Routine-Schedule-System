import React from 'react';
import Image from 'next/image';
import { FaGithub, FaEnvelope, FaExternalLinkAlt, FaBook } from 'react-icons/fa';

interface TeamMember {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  html_url: string;
  email: string | null;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

interface TeamMemberDetail extends TeamMember {
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  repositories: Repository[];
}

interface TeamMemberDetailCardProps {
  member: TeamMemberDetail;
  onClose: () => void;
}

const TeamMemberDetailCard: React.FC<TeamMemberDetailCardProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full my-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <FaExternalLinkAlt size={24} />
          </button>
          <Image 
            src={member.avatar_url} 
            alt={member.name || member.login} 
            width={120} 
            height={120} 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"
          />
        </div>
        <div className="pt-16 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            {member.name || member.login}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FaGithub size={24} />
            </a>
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-red-500 hover:text-red-600 transition-colors">
                <FaEnvelope size={24} />
              </a>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{member.public_repos}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{member.followers}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
            </div>
          </div>
          {(member.location || member.blog) && (
            <div className="mb-6 text-center">
              {member.location && (
                <p className="text-gray-600 dark:text-gray-300 mb-2">📍 {member.location}</p>
              )}
              {member.blog && (
                <a href={member.blog} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                  🌐 {member.blog}
                </a>
              )}
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Recent Repositories</h3>
            <ul className="space-y-3">
              {member.repositories.map(repo => (
                <li key={repo.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start"
                  >
                    <FaBook className="mt-1 mr-2 text-gray-600 dark:text-gray-400" />
                    <div>
                      <h4 className="font-medium text-blue-600 dark:text-blue-400 hover:underline">{repo.name}</h4>
                      {repo.description && <p className="text-sm text-gray-600 dark:text-gray-300">{repo.description}</p>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetailCard;
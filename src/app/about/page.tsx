"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMemberDetailCard from '@/components/TeamMemberDetailCard';

interface TeamMember {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
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

const githubUsernames = ["ThePlator", "TechMelon", "Raushan0303", "teamharsh"];

const TeamMemberCard: React.FC<{ member: TeamMember; onClick: () => void }> = ({ member, onClick }) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-64">
      <Image src={member.avatar_url} alt={member.name || member.login} layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name || member.login}</h3>
        <p className="text-sm text-blue-300">GitHub: {member.login}</p>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio || "No bio available"}</p>
      <div className="flex justify-center space-x-4">
        <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FaGithub size={24} />
        </a>
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-red-500 hover:text-red-600 transition-colors">
            <FaEnvelope size={24} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMemberDetail | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await Promise.all(
          githubUsernames.map(async (username) => {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${username}`);
            }
            return response.json();
          })
        );
        setTeamMembers(members);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch team members. Please try again later.");
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMemberClick = async (member: TeamMember) => {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${member.login}`),
        fetch(`https://api.github.com/users/${member.login}/repos?sort=updated&per_page=5`)
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error(`Failed to fetch data for ${member.login}`);
      }

      const userData: TeamMemberDetail = await userResponse.json();
      const reposData: Repository[] = await reposResponse.json();

      setSelectedMember({ ...userData, repositories: reposData });
    } catch (err) {
      console.error("Error fetching member details:", err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">Meet Our Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.login} member={member} onClick={() => handleMemberClick(member)} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {selectedMember && (
        <TeamMemberDetailCard member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}
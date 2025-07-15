import React from 'react'

export const AuthorInfo = ({ author, date }) => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={author.avatar} 
        alt={author.name}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {author.name}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {date}
        </span>
      </div>
    </div>
  )
}
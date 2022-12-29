const blockTypes = {
  get: {
    title: 'Get',
    titleColor: 'bg-blue-800',
    contentColor: 'bg-getSection',
    makeRequestColor: 'bg-slate-600',
  },
  post: {
    title: 'Post',
    titleColor: 'bg-green-600',
    contentColor: 'bg-postSection',
    makeRequestColor: 'bg-postMakeRequest',
  },
  put: {
    title: 'Put',
    titleColor: 'bg-amber-600',
    contentColor: 'bg-orange-300',
    makeRequestColor: 'bg-orange-500',
  },
  patch: {
    title: 'Patch',
    titleColor: 'bg-yellow-400',
    contentColor: 'bg-yellow-200',
    makeRequestColor: 'bg-yellow-500',
  },
  delete: {
    title: 'Delete',
    titleColor: 'bg-red-700',
    contentColor: 'bg-red-400',
    makeRequestColor: 'bg-deleteMakeRequest',
  }
}

export { blockTypes };
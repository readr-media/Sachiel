import { useCustomTranslation } from '@/hooks/use-custom-translation'

export const useToastMessages = () => {
  const { t } = useCustomTranslation()

  return {
    followCategoryFailed: t(
      'Constants.Toast.follow-category-failed',
      '新增類別失敗，請重新嘗試'
    ),
    unfollowCategoryFailed: t(
      'Constants.Toast.unfollow-category-failed',
      '刪除類別失敗，請重新嘗試'
    ),
    moreActionError: t(
      'Constants.Toast.more-action-error',
      '有點怪怪的，請稍後再試'
    ),
    addCommentFailed: t(
      'Constants.Toast.add-comment-failed',
      '發布留言失敗，請重新嘗試'
    ),
    editCommentFailed: t(
      'Constants.Toast.edit-comment-failed',
      '編輯留言失敗，請重新嘗試'
    ),
    likeCommentFailed: t(
      'Constants.Toast.like-comment-failed',
      '按讚留言失敗，請重新嘗試'
    ),
    unlikeCommentFailed: t(
      'Constants.Toast.unlike-comment-failed',
      '取消按讚留言失敗，請重新嘗試'
    ),
    deleteCommentFailed: t(
      'Constants.Toast.delete-comment-failed',
      '刪除留言失敗，請重新嘗試'
    ),
    followMemberFailed: t(
      'Constants.Toast.follow-member-failed',
      '追蹤失敗，請重新嘗試'
    ),
    unfollowMemberFailed: t(
      'Constants.Toast.unfollow-member-failed',
      '取消追蹤失敗，請重新嘗試'
    ),
    pickStoryFailed: t(
      'Constants.Toast.pick-story-failed',
      '加入精選失敗，請重新嘗試'
    ),
    deletePickFailed: t(
      'Constants.Toast.delete-pick-failed',
      '移除精選失敗，請重新嘗試'
    ),
    addBookmarkFailed: t(
      'Constants.Toast.add-bookmark-failed',
      '加入書籤失敗，請重新嘗試'
    ),
    deleteBookmarkFailed: t(
      'Constants.Toast.delete-bookmark-failed',
      '刪除書籤失敗，請重新嘗試'
    ),
    copyStoryLinkSuccess: t(
      'Constants.Toast.copy-story-link-success',
      '已複製連結'
    ),
    copyInvitationCode: t(
      'Constants.Toast.copy-invitation-code',
      '已複製邀請碼'
    ),
    unlockStorySuccess: t('Constants.Toast.unlock-story-success', '已成功解鎖'),
    payFailedInsufficient: t(
      'Constants.Toast.pay-failed-insufficient',
      '讀選點數餘額不足'
    ),
    payFailedUnowknown: t(
      'Constants.Toast.pay-failed-unknown',
      '支付失敗，請重新嘗試'
    ),
    // TODO: to be added
    blockMemberSuccess: t('Constants.Toast.block-member-success', '已封鎖'),
    unblockMemberSuccess: t(
      'Constants.Toast.unblock-member-success',
      '已取消封鎖'
    ),
    blockMemberFailed: t(
      'Constants.Toast.block-member-failed',
      '封鎖失敗，請重新嘗試'
    ),
    unblockMemberFailed: t(
      'Constants.Toast.unblock-member-failed',
      '取消封鎖失敗，請重新嘗試'
    ),
    addStoryToCollectionSuccess: t(
      'Constants.Toast.add-story-to-collection-success',
      '成功加入集錦'
    ),
    addStoryToCollectionFailed: t(
      'Constants.Toast.add-story-to-collection-failed',
      '加入集錦失敗，請重新嘗試'
    ),
    createCollectionFailed: t(
      'Constants.Toast.create-collection-failed',
      '建立集錦失敗，請重新嘗試'
    ),
    deleteCollectionSuccess: t(
      'Constants.Toast.delete-collection-success',
      '成功刪除集錦'
    ),
    deleteCollectionFailed: t(
      'Constants.Toast.delete-collection-failed',
      '刪除集錦失敗，請重新嘗試'
    ),
    updateProfileFailed: t(
      'Constants.Toast.update-profile-failed',
      '編輯個人檔案失敗，請重新嘗試'
    ),
    addBookmarkSuccess: t('Constants.Toast.add-bookmark-success', '已加入書籤'),
    removeBookmarkSuccess: t(
      'Constants.Toast.remove-bookmark-success',
      '已移除書籤'
    ),
  } as const
}

// 保留原始常數供非 React 環境使用
const TOAST_MESSAGE = {
  followCategoryFailed: '新增類別失敗，請重新嘗試',
  unfollowCategoryFailed: '刪除類別失敗，請重新嘗試',
  moreActionError: '有點怪怪的，請稍後再試',
  addCommentFailed: '發布留言失敗，請重新嘗試',
  editCommentFailed: '編輯留言失敗，請重新嘗試',
  likeCommentFailed: '按讚留言失敗，請重新嘗試',
  unlikeCommentFailed: '取消按讚留言失敗，請重新嘗試',
  deleteCommentFailed: '刪除留言失敗，請重新嘗試',
  followMemberFailed: '追蹤失敗，請重新嘗試',
  unfollowMemberFailed: '取消追蹤失敗，請重新嘗試',
  pickStoryFailed: '加入精選失敗，請重新嘗試',
  deletePickFailed: '移除精選失敗，請重新嘗試',
  addBookmarkFailed: '加入書籤失敗，請重新嘗試',
  deleteBookmarkFailed: '刪除書籤失敗，請重新嘗試',
  copyStoryLinkSuccess: '已複製連結',
  copyInvitationCode: '已複製邀請碼',
  unlockStorySuccess: '已成功解鎖',
  payFailedInsufficient: '讀選點數餘額不足',
  payFailedUnowknown: '支付失敗，請重新嘗試',
  // TODO: to be added
  blockMemberSuccess: '已封鎖',
  unblockMemberSuccess: '已取消封鎖',
  blockMemberFailed: '封鎖失敗，請重新嘗試',
  unblockMemberFailed: '取消封鎖失敗，請重新嘗試',
  addStoryToCollectionSuccess: '成功加入集錦',
  addStoryToCollectionFailed: '加入集錦失敗，請重新嘗試',
  createCollectionFailed: '建立集錦失敗，請重新嘗試',
  deleteCollectionSuccess: '成功刪除集錦',
  deleteCollectionFailed: '刪除集錦失敗，請重新嘗試',
  updateProfileFailed: '編輯個人檔案失敗，請重新嘗試',
  addBookmarkSuccess: '已加入書籤',
  removeBookmarkSuccess: '已移除書籤',
} as const

export default TOAST_MESSAGE

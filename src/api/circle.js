import request from '@/utils/request'

export const getCircleArticleDetails = data => {
  return request({
    method: 'POST',
    url: '/Circle/circle_article_details',
    data
  })
}

export const getEvaluateList = data => {
  return request({
    method: 'POST',
    url: '/Circle/evaluate_list',
    data
  })
}

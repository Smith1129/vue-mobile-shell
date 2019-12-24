/** 
 * api接口的统一出口
 */
// 文章模块接口
import articleHttp from '@/api/article';
import user from '@/api/login';
import play28 from '@/api/play28';
import forge from '@/api/forge';
// 其他模块的接口……
// 导出接口
export default {    
    articleHttp,
    user,
    play28,
    forge
    // ……
}
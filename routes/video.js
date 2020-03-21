const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const videoService = require('../services/videoService')
//获取所有视频
router.get('/get_all_video_list', function (req, res, next) {
    // let VideoData = req.query
    // console.log(VideoData)
    videoService.selectVideo({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
//根据用户获取视频
router.get('/get_video_list_by_user', function (req, res, next) {
    let videoData = req.query
    console.log(videoData)
    videoService.selectVideo(videoData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//修改视频信息
router.post('/update_video', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoService.updateVideo(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});
//删除视频
router.post('/delete_video', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoService.deleteVideo(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//添加视频
router.post('/add_video', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoService.addVideo(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    if (data.Videoname) {
                        res.json({ code: '200', data: data });
                    } else {
                        res.json(data);
                    }
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
module.exports = router;
import Mock from 'mockjs'
import api from '../api'
import list  from './data/test'
import treeData  from './data/tree'
import {createObjectData,addPre} from './utils.js'

Mock.setup({
	timeout: '1500-2500'
})

Mock.mock(addPre(api.system.model_series_list),'get',createObjectData(list))

Mock.mock(addPre(api.system.model_role_permission),'get',createObjectData(treeData))
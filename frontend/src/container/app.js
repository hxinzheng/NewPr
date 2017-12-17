import React from 'react'
import universal from 'react-universal-component'
import Loading from 'app/component/Loading'
import NotFound from 'app/component/notfound'
import { pages, nextIndex, indexFromPath } from './route'
// import 'weui'
// import 'react-weui/build/packages/react-weui.css'
import 'app/stylus/all.styl'


const UniversalComponent = universal(props => import(`../screen/${props.page}`), {
  minDelay: 1200,
  loading: Loading,
  error: NotFound
})

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const page = pages[index]


    return (
      <div>
        <UniversalComponent
          page={page}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />
      </div>
    )
  }

  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false,
      error: false
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    if (this.state.loading) return

    const index = nextIndex(this.state.index)
    const page = pages[index]

    this.props.history.push(`/${page}`)
  }

  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({ loading: true, error: false })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false, error: false })
    }
    else if (!isServer && !isMount) {
      this.setState({ done: true, error: false })
    }
  }

  handleError = error => {
    console.log(error)
    this.setState({ error: true, loading: false })
  }

  buttonText() {
    const { loading, error } = this.state
    if (error) return 'ERROR'
    return loading ? 'LOADING...' : 'CHANGE PAGE'
  }
}
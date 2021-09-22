import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const topics = [
  {
    head: "topic1",
    id: "topic1",
    description: "this is the topic1",
    resource: [
      {
        name: "sub1-topic1",
        id: "sub1-topic1",
        description: "this is the sub1-topic1",
        innerResource: [
          {
            name: "inner1-sub1-topic1",
            id: "inner1-sub1-topic1",
            des: "this is the inner1-sub1-topic1",
          },
          {
            name: "inner2-sub1-topic1",
            id: "inner2-sub1-topic1",
            des: "this is the inner2-sub1-topic1",
          },
        ],
      },
      {
        name: "sub2-topic1",
        id: "sub2-topic1",
        description: "this is the sub2-topic1",
        innerResource: [
          {
            name: "inner1-sub2-topic1",
            id: "inner1-sub2-topic1",
            des: "this is the inner1-sub2-topic1",
          },
          {
            name: "inner2-sub2-topic1",
            id: "inner2-sub2-topic1",
            des: "this is the inner2-sub2-topic1",
          },
        ],
      },
    ],
  },
  {
    head: "topic2",
    id: "topic2",
    description: "this is the topic2",
    resource: [
      {
        name: "sub1-topic2",
        id: "sub1-topic2",
        description: "this is the sub1-topic2",
        innerResource: [
          {
            name: "inner1-sub1-topic2",
            id: "inner1-sub1-topic2",
            des: "this is the inner1-sub1-topic2",
          },
          {
            name: "inner2-sub1-topic2",
            id: "inner2-sub1-topic2",
            des: "this is the inner2-sub1-topic2",
          },
        ],
      },
      {
        name: "sub2-topic2",
        id: "sub2-topic2",
        description: "this is the sub2-topic2",
        innerResource: [
          {
            name: "inner1-sub2-topic2",
            id: "inner1-sub2-topic2",
            des: "this is the inner1-sub2-topic2",
          },
          {
            name: "inner2-sub2-topic2",
            id: "inner2-sub2-topic2",
            des: "this is the inner2-sub2-topic2",
          },
        ],
      },
    ],
  },
  {
    head: "topic3",
    id: "topic3",
    description: "this is the topic3",
    resource: [
      {
        name: "sub1-topic3",
        id: "sub1-topic3",
        description: "this is the sub1-topic3",
        innerResource: [
          {
            name: "inner1-sub1-topic3",
            id: "inner1-sub1-topic3",
            des: "this is the inner1-sub1-topic3",
          },
          {
            name: "inner2-sub1-topic3",
            id: "inner2-sub1-topic3",
            des: "this is the inner2-sub1-topic3",
          },
        ],
      },
      {
        name: "sub2-topic3",
        id: "sub2-topic3",
        description: "this is the sub2-topic3",
        innerResource: [
          {
            name: "inner1-sub2-topic3",
            id: "inner1-sub2-topic3",
            des: "this is the inner1-sub2-topic3",
          },
          {
            name: "inner2-sub2-topic3",
            id: "inner2-sub2-topic3",
            des: "this is the inner2-sub2-topic3",
          },
        ],
      },
    ],
  },
];

const App = () => {
  return (
    <Router>
      <div className="app bg-dark d-flex flex-column">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <hr />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h1>Home</h1>;
};

const Topic = () => {
  const { topicId } = useParams();
  const { path, url } = useRouteMatch();

  const topic = topics.find(({ id }) => id === topicId);

  return (
    <div>
      <h3>{topic.head}</h3>
      <p>{topic.description}</p>
      <ul>
        {topic.resource.map((sub) => (
          <li key={sub.id}>
            <Link to={`${url}/${sub.id}`}>{sub.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Route path={`${path}/:subId`}>
        <Resource />
      </Route>
    </div>
  );
};

const Topics = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h1>Topics</h1>
      <ul className="d-flex flex-column">
        {topics.map(({ head, id }) => (
          <Link to={`${url}/${id}`} key={id}>
            {head}
          </Link>
        ))}
      </ul>
      <hr />
      <Route path={`${path}/:topicId`}>
        <Topic />
      </Route>
    </div>
  );
};

const InnerResource = () => {
  const { topicId, subId, innerSubId } = useParams();

  const topic = topics
    .find(({ id }) => id === topicId)
    .resource.find(({ id }) => id === subId)
    .innerResource.find(({ id }) => id === innerSubId);
  return (
    <div>
      <h2>{topic.name}</h2>
      <p>{topic.des}</p>
    </div>
  );
};

const Resource = () => {
  const { path, url } = useRouteMatch();
  const { topicId, subId } = useParams();

  const topic = topics
    .find(({ id }) => id === topicId)
    .resource.find(({ id }) => id === subId);

  return (
    <div>
      <h4>{topic.name}</h4>
      <p>{topic.description}</p>
      <ul>
        {topic.innerResource.map((innerSub) => (
          <li key={innerSub.id}>
            <Link to={`${url}/${innerSub.id}`}>{innerSub.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Route path={`${path}/:innerSubId`}>
        <InnerResource />
      </Route>
    </div>
  );
};

export default App;

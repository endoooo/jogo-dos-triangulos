// NPM imports
import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useEffect } from 'react'

// Styled

const Dragable = styled.g`
  cursor: move;
  ${props =>
    !props.isDragging
      ? css`
          transition: transform 200ms ease-in;
        `
      : ''}
`

const Polygon = styled.polygon`
  transition: transform 200ms ease-in;
`

// Util

const WIDTH = 8
const HEIGHT = 8

// Component

function BaseTriangle({
  rotation,
  svgRef,
  fill,
  points,
  rotateXY,
  isActive,
  onActivate,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [min, setMin] = useState({ x: 0, y: 0 })
  const [max, setMax] = useState({ x: 0, y: 0 })
  const [selectedShape, setSelectedShape] = useState(null)
  const draggableRef = useRef()
  const polygonRef = useRef()

  function getMousePosition(e) {
    var CTM = svgRef.current.getScreenCTM()
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d,
    }
  }

  useEffect(() => {
    const [min_, max_] = setMinMax()
    const pos = { ...position }
    if (pos.x < min_.x) pos.x = min_.x
    else if (pos.x > max_.x) pos.x = max_.x
    if (pos.y < min_.y) pos.y = min_.y
    else if (pos.y > max_.y) pos.y = max_.y
    setPosition(pos)
  }, [rotation])

  function setMinMax() {
    const bBox = polygonRef.current.getBBox()
    let min_, max_
    if (rotation % 180 === 0) {
      min_ = {
        x: 0,
        y: 0,
      }
      max_ = {
        x: WIDTH - bBox.width,
        y: HEIGHT - bBox.height,
      }
    } else {
      const adjust = {
        x: ((bBox.width - bBox.height) / 2) * -1,
        y: ((bBox.height - bBox.width) / 2) * -1,
      }
      min_ = {
        x: adjust.x,
        y: adjust.y,
      }
      max_ = {
        x: WIDTH - bBox.width - adjust.x,
        y: HEIGHT - bBox.height - adjust.y,
      }
    }
    setMin(min_)
    setMax(max_)
    return [min_, max_]
  }

  function startDrag(e) {
    onActivate()
    setSelectedShape(e.target)
    const offset_ = getMousePosition(e)
    const transform = e.currentTarget.transform.baseVal.getItem(0)
    setOffset({
      x: offset_.x - transform.matrix.e,
      y: offset_.y - transform.matrix.f,
    })
    setMinMax()
  }

  function endDrag() {
    setSelectedShape(null)
  }

  function drag(e) {
    if (selectedShape) {
      e.preventDefault()
      const coord = getMousePosition(e)

      const pos = {
        x: coord.x - offset.x,
        y: coord.y - offset.y,
      }
      if (pos.x < min.x) pos.x = min.x
      else if (pos.x > max.x) pos.x = max.x
      if (pos.y < min.y) pos.y = min.y
      else if (pos.y > max.y) pos.y = max.y

      setPosition(pos)
    }
  }

  return (
    <Dragable
      ref={draggableRef}
      isDragging={selectedShape}
      transform={`translate(${position.x}, ${position.y})`}
      onMouseDown={startDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onMouseMove={drag}
    >
      <Polygon
        ref={polygonRef}
        fill={fill}
        points={points}
        transform={`rotate(${rotation} ${rotateXY})`}
      />
    </Dragable>
  )
}

const triangleProps = {
  EQUILATERAL: {
    points: '1.5 0 3 2.6 0 2.6',
    rotateXY: '1.5 1.3',
    fill: 'black',
  },
  ISOSCELES_RIGHT: { points: '0 0 4 4 0 4', rotateXY: '2 2', fill: 'pink' },
  ISOSCELES_ACUTE: { points: '2 0 4 3 0 3', rotateXY: '2 1.5', fill: 'red' },
  ISOSCELES_OBTUSE: { points: '4 0 8 3 0 3', rotateXY: '4 1.5', fill: 'cyan' },
  SCALENE_RIGHT: { points: '0 0 2 3 0 3', rotateXY: '1 1.5', fill: 'yellow' },
  SCALENE_ACUTE: { points: '1 0 3 2 0 2', rotateXY: '1.5 1', fill: 'green' },
  SCALENE_OBTUSE: { points: '2 0 7 2 0 2', rotateXY: '3.5 1', fill: 'purple' },
}

function EquilateralTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.EQUILATERAL} />
}

function IsoscelesRightTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.ISOSCELES_RIGHT} />
}

function IsoscelesAcuteTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.ISOSCELES_ACUTE} />
}

function IsoscelesObtuseTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.ISOSCELES_OBTUSE} />
}

function ScaleneRightTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.SCALENE_RIGHT} />
}

function ScaleneAcuteTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.SCALENE_ACUTE} />
}

function ScaleneObtuseTriangle(props) {
  return <BaseTriangle {...props} {...triangleProps.SCALENE_OBTUSE} />
}

export {
  EquilateralTriangle,
  IsoscelesRightTriangle,
  IsoscelesAcuteTriangle,
  IsoscelesObtuseTriangle,
  ScaleneRightTriangle,
  ScaleneAcuteTriangle,
  ScaleneObtuseTriangle,
}

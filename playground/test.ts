import { querySelector } from '../index'

try {
  const btn = querySelector('button#start')
  console.log('Button', btn)

  const dialog = querySelector('dialog#pick')
  console.log('This shouldn\'t appear!', dialog)

} catch (e) {
  console.error('Caught Error', e)
}

